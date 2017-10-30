//import html from "../../client/src/ssr";

export default function Root() {
  return {
    index(req, resp, next) {
      //html(req.url, resp.send.bind(resp)).catch(next);
    }
  };
}
