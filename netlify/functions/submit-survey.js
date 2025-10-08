const { Client } = require('pg');
const { randomUUID } = require('crypto');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    // Ensure table exists (no extensions required)
    await client.query(`
      create table if not exists survey_submissions (
        id uuid primary key,
        submitted_at timestamptz not null default now(),
        data jsonb not null
      );
    `);

    const id = randomUUID();
    const insert = await client.query(
      'insert into survey_submissions (id, data) values ($1, $2) returning id, submitted_at',
      [id, payload]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: insert.rows[0] })
    };
  } catch (error) {
    console.error('submit-survey error', error);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};


