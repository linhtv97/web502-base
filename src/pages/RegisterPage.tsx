import { BASE_URL } from "@/config";
import { AuthForm } from "@/types/Auth";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AuthForm>();

  const submitForm = (formValue: AuthForm) => {
    axios.post(BASE_URL + "/register", formValue).then(() => {
      navigate("/login");
    });
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email invalid",
            },
          })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password min length 6",
            },
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default RegisterPage;
