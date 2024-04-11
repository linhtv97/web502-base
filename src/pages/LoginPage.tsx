import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type AuthForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AuthForm>();

  const submit = (formValue: AuthForm) => {
    // sau khi validate dữ liệu đã hợp lệ tại đây mình có dữ liệu xịn và tiến hành đăng kí bằng API
    // sử dụng axios

    axios
      .post<LoginResponse>("http://localhost:8888/login", formValue)
      .then((response) => {
        // lưu access token to sessionStoregare\
        //Bước 1 lấy access token trong response api login
        const accessToken = response.data.accessToken;
        // B2 lưu vào sessionStoregare

        window.sessionStorage.setItem("access-token-key", accessToken);
        navigate("/posts");
      });
  };

  return (
    <div>
      <h1>Login page</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
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

        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
