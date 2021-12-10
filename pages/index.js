import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { baseUrl, fetchApi } from '../utils/fetchApi'
import Property from '../components/Property'

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="small" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl">
      <Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propForSale, propForRent }) {
  console.log(propForSale, propForRent);
  return (
    <Box>
      <h1>Yo</h1>
      <Banner 
        purpose='rnt a home'
        title='rntal homez 4'
        title2='every1'
        desc1='explore apartz, villaz n homez'
        desc2='n more'
        buttonText='explore rnting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap="wrap">
        {propForRent.map(prop => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner 
        purpose='buy a home'
        title1=' find, buy n own'
        title2='Dreeeam'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='explore da buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        /> 
        {propForSale.map(prop => <Property property={property} key={property.id} />)}
    </Box>
  )
}

export async function getStaticProps() {
  const propForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propForSale: propForSale?.hits,
      propForRent: propForRent?.hits
    }
  }
}