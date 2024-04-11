import { Post } from "@/types/Post";
import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type PostsUpdateForm = {
  title: string;
  content: string;
  category: string;
};

const PostsUpdatePage = () => {
  const params = useParams();

  const id = params.id;
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<PostsUpdateForm>();

  useEffect(() => {
    if (id) {
      axios.get<Post>("http://localhost:8888/posts/" + id).then((response) => {
        // dữ liệu sau khi call api post detail
        const post = response.data;

        setValue("title", post.title);
        setValue("content", post.content);
        setValue("category", post.category);
      });
    }
  }, [id]);

  const submit = (formValue: PostsUpdateForm) => {
    // sau khi validate dữ liệu đã hợp lệ tại đây mình có dữ liệu xịn và tiến hành cập nhật bài viết theo id bằng API
    // sử dụng axios

    axios.put(`http://localhost:8888/posts/${id}`, formValue).then(() => {
      navigate("/posts");
    });
  };
  return (
    <div>
      <h1>Update post #{id}</h1>
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

        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default PostsUpdatePage;
