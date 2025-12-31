const attachInterceptors = (
  axiosInst,
  { showLoader, hideLoader, updateProgress }
) => {
  axiosInst.interceptors.request.use(
    (config) => {
      console.log("Loader Start");
      showLoader();

      if (config.requiresAuth) config.withCredentials = true;

      // Track progress if available
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        updateProgress(percentCompleted);
      };

      config.onDownloadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        updateProgress(percentCompleted);
      };

      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInst.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (error) => {
      hideLoader();

      if (error.response?.status === 401) {
        const err = error.response?.data?.error;

        console.log("ERR-->", err);

        if (err?.name === "TokenExpiredError") {
          toast.error("Session expired. Please login again.");
        }
      }

      return Promise.reject(error);
    }
  );
};

export default attachInterceptors;
