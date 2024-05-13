// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fileIdToDownloadUrl(fileId: string) {
  const downloadUrl = DriveApp.getFileById(fileId).getDownloadUrl();
  const redirectedUrl = fetchRedirectedUrl(downloadUrl, {
    followRedirects: false,
  });

  if (typeof redirectedUrl !== 'string') return;

  return redirectedUrl;
}

function fetchRedirectedUrl(
  url: string,
  params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions,
) {
  const retryOptions = {
    intervalMs: 1000,
    maxTryCount: 3,
  };

  for (
    let triedTimes = 0;
    triedTimes < retryOptions.maxTryCount;
    triedTimes++
  ) {
    try {
      const res = UrlFetchApp.fetch(url, params);
      const responseCode = res.getResponseCode();
      if (responseCode >= 300 && responseCode < 400) {
        return res.getHeaders()['Location'];
      }
      if (responseCode === 500) throw new Error('500 Internal Server Error');

      Logger.log(
        `something went wrong. responseCode:${responseCode} response:${res.getContentText()}`,
      );
      break;
    } catch (error) {
      Logger.log(`fetching failed. retrying... ${error}`);
    }

    Utilities.sleep(retryOptions.intervalMs);
  }
}
