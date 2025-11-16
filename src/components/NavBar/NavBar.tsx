import { Link } from 'react-router-dom';
import { Box, Container, HStack, Button, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import './NavBar.css';

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <Box className="app-navbar">
      <Container maxW="container.xl" className="navbar-container">
        <HStack justify="space-between" w="full">
          {/* Left Section - Logo */}
          <Box className='product-name'>
            <Link to="/">
                <Text fontWeight="bold" fontSize="xl">VisualizeML</Text>
            </Link>
          </Box>

          {/* Center Section - Navigation Links */}
          <HStack gap={8} className="nav-links">
            <Link to="/">
              <Button className="navbar-button" variant="ghost" size="md">
                Home
              </Button>
            </Link>
            <Link to="/predict">
              <Button className="navbar-button" variant="ghost" size="md">
                Prediction
              </Button>
            </Link>
            <Link to="/information">
              <Button className="navbar-button" variant="ghost" size="md">
                Information
              </Button>
            </Link>
          </HStack>

          {/* Right Section - GitHub Slide Menu */}
          <Box 
            className="github-slide-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <HStack gap={0} className={`github-slide-menu ${isDropdownOpen ? 'expanded' : ''}`}>
              <a
                href="https://github.com/your-org/model-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-button"
              >
                Model
              </a>
              <a
                href="https://github.com/Davi-Paiva/datathon-front"
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-button"
              >
                Frontend
              </a>
              <a
                href="https://github.com/ppuig2503/datathon2025-backend-JAPD"
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-button"
              >
                Backend
              </a>
              <Box className="github-icon-button">
                <FaGithub size={24} />
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}
