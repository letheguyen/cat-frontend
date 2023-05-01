import React, { memo } from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Category from './category'

const Dashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Category</Tab>
        <Tab>Product</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Category />
        </TabPanel>

        <TabPanel>
          <p>two!</p>
        </TabPanel>

        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default memo(Dashboard)
