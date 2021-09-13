import db from "./dbConnect";

const deletePost = async (id: string) => {
  db.serialize(() => {
    db.run(`DELETE FROM pw WHERE id = ${id}`);
  });
};

export default deletePost;
