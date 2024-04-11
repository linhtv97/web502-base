import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type RegisterForm = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterForm>();

  const submit = (formValue: RegisterForm) => {
    // sau khi validate dữ liệu đã hợp lệ tại đây mình có dữ liệu xịn và tiến hành đăng kí bằng API
    // sử dụng axios

    axios.post("http://localhost:8888/register", formValue).then(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <h1>Register page</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+\@\S+\.\S+/,
                message: "Email invalid",
              },
            })}
            isInvalid={Boolean(errors.email)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length is 6 ",
              },
            })}
            isInvalid={Boolean(errors.password)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Regiser</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
