import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// API base URL: prefer environment variable (Netlify -> REACT_APP_API_BASE_URL),
// fallback to the deployed Railway backend. If the env var already includes /api,
// use it as-is; otherwise accept a full base path in the env var.
const envApiBase = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = envApiBase && envApiBase.trim().length > 0
  ? envApiBase
  : 'https://tecno-backend-production.up.railway.app/api';

const useSurveyStore = create(
  persist(
    (set, get) => ({
      // Session management
      sessionId: null,
      sessionStatus: 'inactive', // inactive, active, completed
      
      // Survey data structure
      surveyData: {
        // Basic Information
        gender: '',
        yearOfStudy: '',
        fieldOfStudy: '',
        university: '',
        
        // Social Media Habits
        socialMediaPlatforms: [],
        timeSpentOnSocialMedia: '',
        followsTechContent: '',
        techUpdateSources: [],
        
        // Mobile Phone Usage
        currentPhoneBrand: '',
        topPhoneFunctions: [],
        phoneChangeFrequency: '',
        tecnoExperience: '',
        tecnoExperienceRating: '',
        
        // Skills & Work
        learningSkills: [],
        partTimeWork: [],
        
        // What Matters Most in a New Phone
        phoneFeaturesRanking: [],
        phoneBudget: '',
        preferredPhoneColors: [],
        
        // TECNO Campus Brand Ambassador Program
        interestedInAmbassador: false,
        ambassadorStrengths: [],
        ambassadorBenefits: [],
        name: '',
        contactNumber: '',
        socialMediaLink: '',
        followerCount: '',
        
        // Suggestions
        suggestions: ''
      },
      
      // Current page tracking
      currentPage: 0,
      totalPages: 8,
      
      // Actions
      // Create new session
      createSession: async (userData = {}) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/session/create`, {
            userId: userData.userId || null,
            deviceType: userData.deviceType || 'desktop',
            browser: userData.browser || 'unknown'
          });
          
          if (response.data.success) {
            set({
              sessionId: response.data.data.sessionId,
              sessionStatus: 'active',
              currentPage: response.data.data.currentPage
            });
            return { success: true, sessionId: response.data.data.sessionId };
          }
          
          return { success: false, error: 'Failed to create session' };
        } catch (error) {
          console.error('Session creation error:', error);
          return { success: false, error: error.message };
        }
      },
      
      // Save progress for current page
      saveProgress: async (pageData) => {
        const { sessionId, currentPage } = get();
        
        if (!sessionId) {
          return { success: false, error: 'No active session' };
        }
        
        try {
          const response = await axios.put(
            `${API_BASE_URL}/session/${sessionId}/save-progress`,
            {
              page: currentPage,
              data: pageData
            }
          );
          
          if (response.data.success) {
            // Update local state
            set((state) => ({
              surveyData: { ...state.surveyData, ...pageData },
              currentPage: Math.max(state.currentPage, response.data.data.currentPage)
            }));
            
            return { success: true };
          }
          
          return { success: false, error: 'Failed to save progress' };
        } catch (error) {
          console.error('Progress save error:', error);
          return { success: false, error: error.message };
        }
      },
      
      // Update survey data locally
      updateSurveyData: (data) => set((state) => ({
        surveyData: { ...state.surveyData, ...data }
      })),
      
      // Navigate to next page
      nextPage: () => set((state) => ({
        currentPage: Math.min(state.currentPage + 1, state.totalPages - 1)
      })),
      
      // Navigate to previous page
      previousPage: () => set((state) => ({
        currentPage: Math.max(state.currentPage - 1, 0)
      })),
      
      // Set current page
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Get session status
      getSessionStatus: async () => {
        const { sessionId } = get();
        
        if (!sessionId) {
          return { success: false, error: 'No active session' };
        }
        
        try {
          const response = await axios.get(`${API_BASE_URL}/session/${sessionId}/status`);
          
          if (response.data.success) {
            const sessionData = response.data.data;
            set({
              sessionStatus: sessionData.status,
              currentPage: sessionData.currentPage,
              surveyData: sessionData.surveyData
            });
            
            return { success: true, data: sessionData };
          }
          
          return { success: false, error: 'Failed to get session status' };
        } catch (error) {
          console.error('Session status error:', error);
          return { success: false, error: error.message };
        }
      },
      
      // Submit completed survey
      submitSurvey: async () => {
        const surveyData = get().surveyData;
        try {
          console.log('Submitting survey data:', surveyData);
          
          // Submit survey data directly to the simple survey endpoint
          const response = await axios.post(`${API_BASE_URL}/survey/submit`, surveyData);
          
          if (response.data.success) {
            console.log('✅ Survey submitted successfully:', response.data);
            
            // Clear all local storage and reset the store
            get().resetSurvey();
            
            // Clear localStorage completely to ensure fresh start
            localStorage.removeItem('survey-storage');
            
            console.log('🗑️ Local storage cleared - ready for new survey');
            
            return { 
              success: true, 
              data: response.data,
              message: 'Survey submitted successfully and local data cleared'
            };
          }
          
          return { success: false, error: 'Failed to submit survey' };
          
        } catch (error) {
          console.error('❌ Survey submission error:', error);
          
          // Check if it's a network error (backend not running)
          if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || 
              error.response?.status === 404 || error.message.includes('Request failed with status code 404')) {
            
            // Fallback: Save to localStorage and show success message
            console.log('🔄 Backend not available, saving to localStorage as fallback');
            
            // Save survey data to localStorage with timestamp
            const fallbackData = {
              ...get().surveyData,
              submittedAt: new Date().toISOString(),
              fallback: true,
              id: `fallback_${Date.now()}`
            };
            
            // Store in localStorage
            const existingSubmissions = JSON.parse(localStorage.getItem('survey-submissions') || '[]');
            existingSubmissions.push(fallbackData);
            localStorage.setItem('survey-submissions', JSON.stringify(existingSubmissions));
            
            // Clear survey data and reset
            get().resetSurvey();
            localStorage.removeItem('survey-storage');
            
            return { 
              success: true, 
              data: fallbackData,
              message: 'Survey saved locally (backend unavailable). Data will be submitted when backend is available.',
              fallback: true
            };
          }
          
          return { success: false, error: error.message };
        }
      },
      
      // Legacy submit method for backward compatibility
      submitSurveyLegacy: async () => {
        try {
          const response = await axios.post(`${API_BASE_URL}/survey/submit`, get().surveyData);
          console.log('Survey submitted successfully:', response.data);
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Error submitting survey:', error);
          return { success: false, error: error.message };
        }
      },
      
      // Reset survey data and clear all session information
      resetSurvey: () => {
        console.log('🔄 Resetting survey data and clearing session...');
        
        // Clear localStorage
        localStorage.removeItem('survey-storage');
        
        // Reset all state
        set({
          sessionId: null,
          sessionStatus: 'inactive',
          currentPage: 0,
          surveyData: {
            // Basic Information
            gender: '',
            yearOfStudy: '',
            fieldOfStudy: '',
            university: '',
            
            // Social Media Habits
            socialMediaPlatforms: [],
            timeSpentOnSocialMedia: '',
            followsTechContent: '',
            techUpdateSources: [],
            
            // Mobile Phone Usage
            currentPhoneBrand: '',
            topPhoneFunctions: [],
            phoneChangeFrequency: '',
            tecnoExperience: '',
            tecnoExperienceRating: '',
            
            // Skills & Work
            learningSkills: [],
            partTimeWork: [],
            
            // What Matters Most in a New Phone
            phoneFeaturesRanking: [],
            phoneBudget: '',
            preferredPhoneColors: [],
            
            // TECNO Campus Brand Ambassador Program
            interestedInAmbassador: false,
            ambassadorStrengths: [],
            ambassadorBenefits: [],
            name: '',
            contactNumber: '',
            socialMediaLink: '',
            followerCount: '',
            
            // Suggestions
            suggestions: ''
          }
        });
        
        console.log('✅ Survey data reset complete - fresh start ready');
      },
      
      // Start fresh survey (when user scans QR code again)
      startFreshSurvey: () => {
        console.log('🆕 Starting fresh survey - clearing all previous data...');
        get().resetSurvey();
        return { success: true, message: 'Fresh survey started' };
      },

      // Retry submitting fallback data when backend becomes available
      retryFallbackSubmissions: async () => {
        try {
          const fallbackSubmissions = JSON.parse(localStorage.getItem('survey-submissions') || '[]');
          const pendingSubmissions = fallbackSubmissions.filter(sub => sub.fallback);
          
          if (pendingSubmissions.length === 0) {
            return { success: true, message: 'No pending submissions to retry' };
          }

          console.log(`🔄 Retrying ${pendingSubmissions.length} fallback submissions...`);
          
          const results = [];
          for (const submission of pendingSubmissions) {
            try {
              // Remove fallback flag and submit
              const { fallback, ...dataToSubmit } = submission;
              const response = await axios.post(`${API_BASE_URL}/survey/submit`, dataToSubmit);
              
              if (response.data.success) {
                results.push({ success: true, id: submission.id });
                console.log(`✅ Successfully submitted fallback data: ${submission.id}`);
              } else {
                results.push({ success: false, id: submission.id, error: 'Server rejected submission' });
              }
            } catch (error) {
              results.push({ success: false, id: submission.id, error: error.message });
              console.error(`❌ Failed to submit fallback data ${submission.id}:`, error.message);
            }
          }

          // Remove successfully submitted items from localStorage
          const successfulIds = results.filter(r => r.success).map(r => r.id);
          const remainingSubmissions = fallbackSubmissions.filter(sub => !successfulIds.includes(sub.id));
          localStorage.setItem('survey-submissions', JSON.stringify(remainingSubmissions));

          const successCount = results.filter(r => r.success).length;
          const failCount = results.filter(r => !r.success).length;

          return {
            success: true,
            message: `Retry completed: ${successCount} successful, ${failCount} failed`,
            results
          };

        } catch (error) {
          console.error('❌ Error retrying fallback submissions:', error);
          return { success: false, error: error.message };
        }
      }
    }),
    {
      name: 'survey-storage', // unique name for localStorage
      partialize: (state) => ({ 
        sessionId: state.sessionId,
        sessionStatus: state.sessionStatus,
        surveyData: state.surveyData, 
        currentPage: state.currentPage 
      }), // only persist essential data
    }
  )
);

export default useSurveyStore;