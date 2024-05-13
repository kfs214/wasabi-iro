type Message =
  | {
      type: 'image';
      originalContentUrl: string;
      previewImageUrl: string;
    }
  | {
      type: 'text';
      text: string;
    };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function line({
  channelAccessToken,
  apiOrigin,
}: {
  channelAccessToken: string;
  apiOrigin: string;
}) {
  const commonOptions = {
    method: 'post' as const,
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: {
      Authorization: `Bearer ${channelAccessToken}`,
      'X-Line-Retry-Key': Utilities.getUuid(),
    },
  };

  function fetch(
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
        if (responseCode === 200) break;
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

  function push({ to, messages }: { to: string; messages: Message[] }) {
    const PATH = 'v2/bot/message/push';
    const ENDPOINT = `${apiOrigin}/${PATH}`;

    const options = {
      ...commonOptions,
      payload: JSON.stringify({
        to,
        messages,
      }),
    };

    fetch(ENDPOINT, options);
  }

  function broadcast({ messages }: { messages: Message[] }) {
    const PATH = 'v2/bot/message/broadcast';
    const ENDPOINT = `${apiOrigin}/${PATH}`;

    const options = {
      ...commonOptions,
      payload: JSON.stringify({
        messages,
      }),
    };

    fetch(ENDPOINT, options);
  }

  return { push, broadcast };
}
