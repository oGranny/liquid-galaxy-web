# Liquid Galaxy Web

Welcome to the Liquid Galaxy Web project! This project aims to provide a web-based interface for interacting with the Liquid Galaxy system.

## Introduction

Liquid Galaxy Web is a web application designed to control and interact with the Liquid Galaxy system. It provides an intuitive and user-friendly interface for managing the system's features and functionalities. 

## Features

- excecute commands using POST request
- upload kml files usin POST request
## Installation

To install and set up the Liquid Galaxy Web project, follow these steps:

> [!IMPORTANT]
> Ensure you have Liquid Galaxy set up before proceeding with these steps.

1. Run the following command on the master Liquid Galaxy machine:
    ```bash
    bash <(curl -S https://raw.githubusercontent.com/oGranny/liquid-galaxy-web/master/install.bash)
    ```
2. Clone the repository in your physical machine:
    ```bash
    git clone https://github.com/oGranny/liquid-galaxy-web
    ```
3. Navigate to the project directory:
    ```bash
    cd liquid-galaxy-web
    ```
4. Start the development server:
    ```bash
    python -m http.server 8080
    ```
5. Open your web browser and go to `http://localhost:8080`. Navigate to the "Connect" tab, enter the IP address of your master machine, use port 81 (not the SSH port), fill in the other required inputs, and click "Connect".

> [!WARNING]
> If you are using virtual machines and accessing the website from a machine other than the host machine, forward port 81 of the master VM.

## Usage

Once the development server is running and connected, open control tab to access the Liquid Galaxy Web interface. From there, you can interact with the Liquid Galaxy system using the provided controls and features.

## Contributing

We welcome contributions to the Liquid Galaxy Web project! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b my-feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add my feature"
    ```
4. Push your changes to your fork:
    ```bash
    git push origin my-feature-branch
    ```
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
