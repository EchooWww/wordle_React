import { useForm } from "react-hook-form";
//yup is user for validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const Form = () => {
  // register: used for giving name to the inputs

  // specify the format of our data
  const schema = yup.object().shape({
    fullName: yup.string().required("Your fullname is required!"),
    email: yup.string().email().required("Your email is required!"),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18)
      .required("Your age is required!"),
    password: yup
      .string()
      .min(4)
      .max(20)
      .required("Your password is required!"),
    // specify conformPassword to be same as password
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Please confirm your password!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // define our own onSubmit function
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    // and call the onSubmit function within useForm in-built handleSubmit()
    // {...register("fullName")} serves as the "name" attribute of the input
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full Name..." {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <input type="text" placeholder="abc@def.gh" {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="number" placeholder="13" {...register("age")} />
      <p>{errors.age?.message}</p>
      <input
        type="password"
        placeholder="Password.."
        {...register("password")}
      />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password.."
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  );
};
