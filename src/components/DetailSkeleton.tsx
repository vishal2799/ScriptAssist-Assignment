import { Container, Skeleton, Group, Stack, Grid } from '@mantine/core';

const ResourceDetailSkeleton = () => {

  return (
    <Container size="md" style={{ marginTop: '2rem' }}>
        <Skeleton height={50} width="100%" />
        <Grid mb={40} mt={40}>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
        <Skeleton height={200} circle />
                        </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6, lg: 8 }}>
                  <Stack gap={20}>
      <Skeleton height={25} width='100%'/>
      <Skeleton height={25} width='100%'/>
      <Skeleton height={25} width='100%'/>
      <Skeleton height={25} width='100%'/>
    </Stack>
                  </Grid.Col>
        </Grid>
        <Group mb={20}>
        <Skeleton height={10} width="10%" />
        <Skeleton height={10} width="10%" />  
        <Skeleton height={10} width="10%" />
        <Skeleton height={10} width="10%" />
        <Skeleton height={10} width="10%" />
        </Group>
        <Stack gap={10} style={{ marginBottom: '1rem' }}>
      <Skeleton height={25} width="100%" />
      <Skeleton height={25} width="100%" />
      <Skeleton height={25} width="100%" />
    </Stack>
    </Container>
  );
};

export default ResourceDetailSkeleton;
