
const attachInterceptors = (
  axiosInst,
  { showLoader, hideLoader, updateProgress, logoutStatusSuccess },
) => {
  const reqInterceptor = axiosInst.interceptors.request.use(
    (config) => {
      console.log("Loader Start");
      showLoader();

      // Track progress if available
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        updateProgress(percentCompleted);
      };

      config.onDownloadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        updateProgress(percentCompleted);
      };

      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    },
  );

  // Response interceptor
  const resInterceptor = axiosInst.interceptors.response.use(
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
          logoutStatusSuccess("Session expired. Please login again.");
        }
      }

      return Promise.reject(error);
    },
  );

  return { reqInterceptor, resInterceptor };
};

export default attachInterceptors;
