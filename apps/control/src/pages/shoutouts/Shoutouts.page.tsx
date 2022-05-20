import {
  Container,
  Group,
  Loader,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core"
import { TwitterApiResults } from "interface/utils"
import { FormEventHandler, useState } from "react"
import { useHttpsCallable } from "react-firebase-hooks/functions"
import { fn } from "utils/firebase"

const ShoutoutsPage = () => {
  const [callable, loading] = useHttpsCallable<
    { search: string },
    TwitterApiResults
  >(fn, "twitterAPI")
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<TwitterApiResults>({})
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    if (!search) return
    const res = await callable({ search })
    setResults(res?.data ?? {})
  }
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <Stack spacing="xl">
        <Title order={3}>Shoutouts</Title>
        <form onSubmit={onSubmit}>
          <Group sx={{ alignItems: "center" }}>
            <TextInput
              value={search}
              placeholder="#AllG"
              onChange={({ target: { value } }) => setSearch(value)}
              label="Search"
              rightSection={loading ? <Loader size={14} /> : undefined}
            />
          </Group>
        </form>
        <Stack>
          {Object.values(results).map((t) => (
            <Text>{t.text}</Text>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

export default ShoutoutsPage
