//import Root from "./controllers/root";
import Guestbook from "./controllers/guestbook";

export default function(app) {
  //const root = Root(app);
  const guestbook = Guestbook(app);

  app
    .route("/guestbook")
    .get(guestbook.index)
    .post(guestbook.create);
  //app.use("*", root.index);
}
