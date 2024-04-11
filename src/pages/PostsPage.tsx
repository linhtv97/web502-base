import { Post } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostsPage = () => {
  // lấy danh sách bài viết qua api và hiện thị nó dưới dạng table
  // tạo state để lưu danh sách bài viết sau khi lấy được từ API

  // dữ liệu state ban đầu là mảng rỗng vì chưa call api
  const [posts, setPosts] = useState<Post[]>([]);

  const [postWillDelete, setPostWillDelete] = useState<Post | null>(null);

  useEffect(() => {
    axios.get<Post[]>("http://localhost:8888/posts").then(({ data }) => {
      setPosts(data);
    });
  }, []);

  const handleDelete = () => {
    axios
      .delete("http://localhost:8888/posts/" + postWillDelete?.id)
      .then(() => {
        // cập nhật lại danh sách
        // cach 1
        // window.location.reload();
        // cach 2
        const postNotDelete = posts.filter(
          (post) => post.id !== postWillDelete?.id
        );

        setPosts(postNotDelete);
        setPostWillDelete(null);
      });
  };

  const handleBtnDeleteClick = (post: Post) => {
    setPostWillDelete(post);
  };

  return (
    <div>
      <h1>Posts</h1>

      <Link to={"/posts/add"}>
        <Button size="sm">New</Button>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr>
              <td>#{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>{post.category}</td>
              <td
                style={{
                  display: "flex",
                  gap: 12,
                }}
              >
                <Link to={`/posts/edit/${post.id}`}>
                  <Button size="sm">Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleBtnDeleteClick(post)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!postWillDelete} onHide={() => setPostWillDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete post has title{" "}
          <strong>{postWillDelete?.title}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPostWillDelete(null)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostsPage;
