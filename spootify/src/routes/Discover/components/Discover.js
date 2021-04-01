import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { getCategories, getFeaturedPlaylists, getNewReleases } from '../api/requests';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount = async () => {
    // Wait for each for a visually cleaner loading experience
    await this.getData('newReleases', getNewReleases);
    await this.getData('playlists', getFeaturedPlaylists);
    await this.getData('categories', getCategories);
  };

  getData = (key, fetchFunction) => {
    return new Promise(async resolve => {
      this.setState({ [key]: await fetchFunction() }, resolve);
    })
  };

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
