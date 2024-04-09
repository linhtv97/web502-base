import { BASE_URL } from "@/config";
import { Post, PostForm } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<PostForm>();

  useEffect(() => {
    if (id) {
      axios.get<Post>(BASE_URL + "/posts/" + id).then((response) => {
        const post = response.data;
        setValue("title", post.title);
        setValue("content", post.content);
        setValue("category", post.category);
      });
    }
  }, [id]);

  const submitForm = (formValue: PostForm) => {
    axios.put(BASE_URL + "/posts/" + id, formValue).then(() => {
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

      <Button type="submit">Update</Button>
    </Form>
  );
};

export default PostEdit;
