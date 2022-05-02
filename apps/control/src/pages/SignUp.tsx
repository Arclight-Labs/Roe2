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
import { UserCreateInfer, userCreateSchema } from "utils/schema/user.schema"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { showNotification } from "@mantine/notifications"
import { useAuth } from "../context/auth/Auth.hooks"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth as FirebaseAuth } from "utils/firebase"
import { runAsync } from "utils/hooks"

const Login = () => {
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const [password2, setPassword2] = useState("")
  const navigate = useNavigate()
  const { register, handleSubmit, setError } = useForm<UserCreateInfer>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userCreateSchema),
  })

  const submit = handleSubmit(async ({ email, password }) => {
    if (password !== password2) {
      setError("password", { message: "passwords do not match" })
    }
    setLoading(true)
    const promise = createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    const [, err] = await runAsync(promise)
    if (err) {
      showNotification({
        color: "error",
        message: err.message,
      })
      return setLoading(false)
    }

    setLoading(false)
    navigate("/")
  }, console.error)

  useEffect(() => {
    if (!auth.user) return
    navigate("/")
  }, [auth])

  return (
    <Center sx={{ height: "100vh", width: "100vw" }}>
      <LoadingOverlay visible={loading} />
      <Stack>
        <Title order={3} align="center">
          Sign up
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
              <PasswordInput
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                label="Re-enter password"
                required
              />
            </Stack>
            <Button type="submit">Sign Up</Button>
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
