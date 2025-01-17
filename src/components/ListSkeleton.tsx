import { Container, Skeleton, Group } from '@mantine/core';

const ResourceListSkeleton = () => {
  const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
    <Group key={index} justify='space-between' align="center" style={{ marginBottom: '1rem' }}>
      <Skeleton height={50} circle />
      <Skeleton height={20} width="20%" />
      <Skeleton height={20} width="20%" />
      <Skeleton height={20} width="20%" />
    </Group>
  ));

  return (
    <Container size="md" style={{ marginTop: '2rem' }}>
        <Skeleton height={50} width="100%" />
        <Group justify='space-between' mb={40} mt={30}>
        <Skeleton height={20} width="30%" />
        <Skeleton height={20} width="30%" />
        <Skeleton height={20} width="30%" />
        </Group>
      {skeletonItems}
      <Group justify='center' gap={10} mt={30}>
        <Skeleton height={10} width="5%" />
        <Skeleton height={10} width="5%" />
        <Skeleton height={10} width="5%" />
        </Group>
    </Container>
  );
};

export default ResourceListSkeleton;
