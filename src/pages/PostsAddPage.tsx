import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type PostAddForm = {
  title: string;
  content: string;
  category: string;
};

const PostsAddPage = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PostAddForm>();

  const submit = (formValue: PostAddForm) => {
    // sau khi validate dữ liệu đã hợp lệ tại đây mình có dữ liệu xịn và tiến hành tạo bài viết bằng API
    // sử dụng axios
    axios.post("http://localhost:8888/posts", formValue).then(() => {
      navigate("/posts");
    });
  };
  return (
    <div>
      <h1>Add new post</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 6,
                message: "Min length is 6 ",
              },
            })}
            isInvalid={Boolean(errors.title)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Content"
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Min length is 50 ",
              },
            })}
            isInvalid={Boolean(errors.content)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.content?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            placeholder="Category"
            {...register("category", {
              required: "Category is required",
            })}
            isInvalid={Boolean(errors.category)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
};

export default PostsAddPage;
