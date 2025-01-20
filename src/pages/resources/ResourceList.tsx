import { useState } from 'react';
import { Container, Text, Table, Button, Select, Group, Pagination, TextInput, Center } from '@mantine/core';
import { useResources } from '../../api/useResources';
import { useNavigate } from 'react-router-dom';
import IntroSection from '../../components/IntroSection';
import ResourceListSkeleton from '../../components/ListSkeleton';

const ResourceListPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); 
  const { resourceList, totalPages, isLoading, error } = useResources(currentPage); 

  
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'height' | 'mass'>('name');
  const [filterGender, setFilterGender] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      const valueA = sortBy === 'name' ? a.name : parseInt(a[sortBy]);
      const valueB = sortBy === 'name' ? b.name : parseInt(b[sortBy]);
  
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };
  

 
  const filteredData = (resourceList || []).filter((resource: any) => {
    const matchesSearch = resource.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender = filterGender ? resource.gender === filterGender : true;
    return matchesSearch && matchesGender;
  });

  const sortedAndFilteredData = sortData(filteredData);

 
  if (isLoading) {
    console.log('loading');
    return (
      <ResourceListSkeleton />
    )
  };

  
  if (error) {
    return (<Text color="red">{(error as Error).message}</Text>);
  }

  const rows = sortedAndFilteredData.length > 0 ? (
    sortedAndFilteredData.map((resource: any) => (
      <Table.Tr key={resource.name}>
        <Table.Td>{resource.name}</Table.Td>
        <Table.Td>{resource.gender}</Table.Td>
        <Table.Td>{resource.height}</Table.Td>
        <Table.Td>{resource.mass}</Table.Td>
        <Table.Td>
          <Button
            variant="dark"
            onClick={() => navigate(`/resources/${resource.url.split('/').slice(-2, -1)[0]}`)}
          >
            View Details
          </Button>
        </Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr>
      <Table.Td colSpan={5}>
        <Text fw={500} ta="center">No resources found</Text>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <>
    <IntroSection
        pageType="list" />
      <Container mt={20}>
      
      
      <Group mb="md" justify="space-between">
  <TextInput
    label="Search by name"
    placeholder="Typing..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ width: '300px' }}
  />

  <Select
    label="Filter by gender"
    value={filterGender}
    onChange={setFilterGender}
    data={[
      { value: '', label: 'All' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'n/a', label: 'N/A' },
    ]}
    style={{ width: '200px' }}
  />

  <Select
    label="Sort by"
    value={sortBy}
    onChange={(value) => setSortBy(value as 'name' | 'height' | 'mass')}
    data={[
      { value: 'name', label: 'Name' },
      { value: 'height', label: 'Height' },
      { value: 'mass', label: 'Mass' },
    ]}
    style={{ width: '200px' }}
  />

  <Select
    label="Sort order"
    value={sortOrder}
    onChange={(value) => setSortOrder(value as 'asc' | 'desc')}
    data={[
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' },
    ]}
    style={{ width: '200px' }}
  />
</Group>


      
      <Table.ScrollContainer minWidth={500}>

      <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Height</Table.Th>
          <Table.Th>Mass</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
</Table.ScrollContainer>
    
      <Center my={20}>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        total={totalPages}
      />
      </Center>
    </Container>
    </>
    
  );
};

export default ResourceListPage;
