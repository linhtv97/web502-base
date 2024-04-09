import { BASE_URL } from "@/config";
import { PostForm } from "@/types/Post";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const PostAdd = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PostForm>();

  const submitForm = (formValue: PostForm) => {
    axios.post(BASE_URL + "/posts", formValue).then(() => {
      navigate("/posts");
    });
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 6,
              message: "Title min 6 char",
            },
          })}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.title?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 50,
              message: "Content min lenght 50 char",
            },
          })}
          isInvalid={!!errors.content}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.content?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Category</Form.Label>
        <Form.Control
          {...register("category", {
            required: "Category is required",
          })}
          isInvalid={!!errors.category}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.category?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Create</Button>
    </Form>
  );
};

export default PostAdd;
