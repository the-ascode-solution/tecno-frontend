const { Client } = require('pg');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    // Ensure table exists
    await client.query(`
      create table if not exists survey_submissions (
        id uuid primary key default gen_random_uuid(),
        submitted_at timestamptz not null default now(),
        data jsonb not null
      );
    `);

    const insert = await client.query(
      'insert into survey_submissions (data) values ($1) returning id, submitted_at',
      [payload]
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


