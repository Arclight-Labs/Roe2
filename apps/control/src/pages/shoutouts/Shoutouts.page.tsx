import {
  Container,
  Group,
  Loader,
  Stack,
  TextInput,
  Title,
  Text,
  SimpleGrid,
} from "@mantine/core"
import { TwitterApiResults } from "interface/utils"
import { FormEventHandler, useState } from "react"
import { useHttpsCallable } from "react-firebase-hooks/functions"
import { useScreen } from "ui/Screen.hook"
import { fn } from "utils/firebase"
import { usePermission } from "../../hooks/usePermission.hook"
import ShoutoutsCard from "../../ui/shoutouts/ShoutoutsCard.ui"

const ShoutoutsPage = () => {
  const isAllowed = usePermission()
  const [callable, loading] = useHttpsCallable<
    { search: string },
    TwitterApiResults
  >(fn, "twitterAPI")
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<TwitterApiResults>({})
  const { md, xl, lg } = useScreen()
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
              disabled={!isAllowed}
              value={search}
              placeholder="#AllG"
              onChange={({ target: { value } }) => setSearch(value)}
              label="Search"
              rightSection={loading ? <Loader size={14} /> : undefined}
            />
          </Group>
        </form>
        <Stack>
          <SimpleGrid cols={xl ? 4 : lg ? 3 : md ? 2 : 1}>
            {Object.values(results).map((t) => (
              <div key={t.id}>
                <ShoutoutsCard tweet={t} />
              </div>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  )
}

export default ShoutoutsPage
