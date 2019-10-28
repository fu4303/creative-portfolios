/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import './index.css'

import PortfoliosList from '../components/PortfoliosList'
import PortfolioItem from '../components/PortfolioItem'
import Container from '../components/Container'

const blog = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 800, maxHeight: 480, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            id
          }
        }
      }
    }
  `)

  return (
    <Container>
      <h1>Creative Portfolios</h1>

      <PortfoliosList>
        {data.allMarkdownRemark.edges.map(edge => (
          <PortfolioItem>
            <Link to={`/${edge.node.fields.slug}`} key={edge.node.id}>
              <Img fluid={edge.node.frontmatter.image.childImageSharp.fluid} />

              {edge.node.frontmatter.title}
            </Link>
          </PortfolioItem>
        ))}
      </PortfoliosList>
    </Container>
  )
}

export default blog