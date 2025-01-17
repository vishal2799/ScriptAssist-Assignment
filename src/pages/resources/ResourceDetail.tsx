import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Title, Text, Stack, Grid, Tabs, Accordion, Avatar } from '@mantine/core';
import { useResource } from '../../api/useResource';
import IntroSection from '../../components/IntroSection';
import ResourceDetailSkeleton from '../../components/DetailSkeleton';

const ResourceDetailPage = () => {
  const { id } = useParams();
  const { resource, homeworld, species, films, starships, isLoading, error } = useResource('people', id || '');
  const [activeTab, setActiveTab] = useState<string | null>('homeworld');
  if (isLoading) {
    return (
      <ResourceDetailSkeleton />
    )
  };
  if (error) return <Text color="red">{(error as Error).message}</Text>;

  const getAvatarUrl = (name: string) => {
    return `https://robohash.org/${encodeURIComponent(name)}?set=set1`;
  };

  return (
    <>
    <IntroSection
        pageType="detail"
      />
      <Container mt={20}>
      <Card shadow="sm" padding="lg">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
                  <Avatar
                    src={getAvatarUrl(resource?.name || 'default')}
                    size={180}
                    radius="md"
                    alt={`Avatar of ${resource?.name}`}
                  />
                </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, lg: 8 }}>
            <Title order={3}>{resource?.name}</Title>
            <Stack>
              <Text>Gender: {resource?.gender}</Text>
              <Text>Height: {resource?.height} cm</Text>
              <Text>Mass: {resource?.mass} kg</Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={12} mt={20}>
            <Tabs variant='outline' value={activeTab} onChange={(value: string | null) => setActiveTab(value)}>
              <Tabs.List>
                <Tabs.Tab value="homeworld">Homeworld</Tabs.Tab>
                <Tabs.Tab value="species">Species</Tabs.Tab>
                <Tabs.Tab value="films">Films</Tabs.Tab>
                <Tabs.Tab value="starships">Starships</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="homeworld" p={20}>
                {homeworld ? (
                  <Stack>
                    <Text>Name: {homeworld.name}</Text>
                    <Text>Climate: {homeworld.climate}</Text>
                    <Text>Terrain: {homeworld.terrain}</Text>
                    <Text>Population: {homeworld.population}</Text>
                  </Stack>
                ) : (
                  <Text>No homeworld information available.</Text>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="species" p={20}>
                {species && species.length > 0 ? (
                  species.map((specie, index) => (
                    <Stack key={index}>
                      <Text>Name: {specie.name}</Text>
                      <Text>Classification: {specie.classification}</Text>
                      <Text>Average Height: {specie.average_height}</Text>
                    </Stack>
                  ))
                ) : (
                  <Text>No species information available.</Text>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="films" p={20}>
                <Accordion>
                  {films?.map((film, index) => (
                    <Accordion.Item key={index} value={`film-${index}`}>
                      <Accordion.Control>{film.title}</Accordion.Control>
                      <Accordion.Panel>
                        <Text>Released: {film.release_date}</Text>
                        <Text>{film.opening_crawl}</Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )) || <Text>No films available.</Text>}
                </Accordion>
              </Tabs.Panel>

              <Tabs.Panel value="starships" p={20}>
                <Accordion>
                  {starships?.map((starship, index) => (
                    <Accordion.Item key={index} value={`starship-${index}`}>
                      <Accordion.Control>{starship.name}</Accordion.Control>
                      <Accordion.Panel>
                        <Text>Model: {starship.model}</Text>
                        <Text>Manufacturer: {starship.manufacturer}</Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )) || <Text>No starships available.</Text>}
                </Accordion>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
    </>
  );
};

export default ResourceDetailPage;

