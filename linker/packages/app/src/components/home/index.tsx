import {
  HomePageRandomJoke,
  HomePageStarredEntities,
  CustomHomepageGrid,
} from '@backstage/plugin-home';
import { Content, Header, Page } from '@backstage/core-components';
import { HomePageSearchBar } from '@backstage/plugin-search';
import React from 'react';

export const homePage = (
  <>
    <Header
      title="Welcome to Backstage"
      subtitle="Some quick intro and links."
    />
    <CustomHomepageGrid>
      // Insert the allowed widgets inside the grid
      <HomePageSearchBar />
      <HomePageRandomJoke />
      <HomePageStarredEntities />
    </CustomHomepageGrid>
  </>
);
