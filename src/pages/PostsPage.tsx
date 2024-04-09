import { BASE_URL } from "@/config";
import { Post } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>(BASE_URL + "/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    const result = confirm("Are you sure!");
    if (result) {
      axios.delete(BASE_URL + "/posts/" + id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <Link to={"/posts/add"}>
        <Button size="sm">Add</Button>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>{post.category}</td>
              <td
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <Link to={"/posts/edit/" + post.id}>
                  <Button size="sm">Edit</Button>
                </Link>
                <Button size="sm" onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostsPage;
