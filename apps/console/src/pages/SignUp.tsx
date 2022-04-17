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
import { userCreate } from "utils/api/queries"
import { Link, useNavigate } from "react-router-dom"
import { showNotification } from "@mantine/notifications"
import { useAuth, useAuthActions } from "../context/auth/Auth.hooks"

const Login = () => {
  const auth = useAuth()
  const { create } = useAuthActions()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [password2, setPassword2] = useState("")
  const { register, handleSubmit, setError } = useForm<LoginInfer>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  const onClick = handleSubmit(async ({ username, password }) => {
    if (password !== password2) {
      setError("password", { message: "passwords do not match" })
    }
    setLoading(true)
    create(username, password)
      .then(() => {
        setLoading(false)
        navigate("/")
      })
      .catch((e) => {
        setLoading(false)
      })
  }, console.error)

  useEffect(() => {
    if (!auth) return
    navigate("/")
  }, [auth])

  return (
    <Center sx={{ height: "100vh", width: "100vw" }}>
      <LoadingOverlay visible={loading} />
      <Stack>
        <Title order={3} align="center">
          Sign up
        </Title>
        <Card withBorder>
          <Stack>
            <Stack spacing="sm">
              <TextInput {...register("username")} label="Username" />
              <PasswordInput
                {...register("password")}
                label="Password"
                required
              />
              <PasswordInput
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                label="Re-enter password"
                required
              />
            </Stack>
            <Button onClick={onClick}>Sign Up</Button>
          </Stack>
        </Card>
        <Text align="center">
          Already have an account?{" "}
          <Anchor component={Link} to="/auth/login">
            Login
          </Anchor>
        </Text>
      </Stack>
    </Center>
  )
}

export default Login
