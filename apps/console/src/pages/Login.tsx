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
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth, useAuthActions } from "../context/auth/Auth.hooks"

const Login = () => {
  const user = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthActions()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<LoginInfer>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  const submit = handleSubmit(async ({ username, password }) => {
    setLoading(true)

    login(username, password).then(() => {
      if (location.pathname === "/auth/login") {
        navigate("/")
      }
    })
    setLoading(false)
  }, console.error)

  return (
    <Center sx={{ height: "100vh", width: "100vw" }}>
      <LoadingOverlay visible={loading} />
      <Stack>
        <Title order={3} align="center">
          Sign in
        </Title>
        <Card withBorder component="form" onSubmit={submit}>
          <Stack>
            <Stack spacing="sm">
              <TextInput {...register("username")} label="Username" />
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
