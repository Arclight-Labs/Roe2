import {
  Card,
  Center,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
  Title,
  Text,
  Anchor,
} from "@mantine/core"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginInfer, loginSchema } from "utils/schema/login.schema"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth as FirebaseAuth } from "utils/firebase"
import { showNotification } from "@mantine/notifications"
import { useAuth } from "../context/auth/Auth.hooks"

const Login = () => {
  const { loading: userLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<LoginInfer>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  const submit = handleSubmit(async ({ email, password }) => {
    setLoading(true)

    signInWithEmailAndPassword(FirebaseAuth, email, password)
      .then(() => {
        if (location.pathname === "/auth/login") {
          navigate("/")
        }
      })
      .catch((err) => {
        showNotification({
          message: err.message || "An error occurred",
          color: "error",
        })
      })
    setLoading(false)
  }, console.error)

  return (
    <Center sx={{ height: "100vh", width: "100vw" }}>
      <LoadingOverlay visible={loading || userLoading} />
      <Stack>
        <Title order={3} align="center">
          Sign in
        </Title>
        <Card withBorder component="form" onSubmit={submit}>
          <Stack>
            <Stack spacing="sm">
              <TextInput {...register("email")} label="Email" />
              <PasswordInput
                {...register("password")}
                label="Password"
                required
              />
            </Stack>
            <Button type="submit">Login</Button>
          </Stack>
        </Card>
        <Text align="center">
          New user?{" "}
          <Anchor component={Link} to="/auth/signup">
            Create an account
          </Anchor>
        </Text>
      </Stack>
    </Center>
  )
}

export default Login
