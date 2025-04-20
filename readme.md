# Happi-Bot

This guide explains how to install models from Ollama and Use Happi-Bot.

## Prerequisites

- Ensure you have Python 3.8 or later installed.
- Install `ollama` by running:

    Visit the [Ollama website](https://ollama.com) to download the latest version.

## Installing Models

1. Use the `ollama` CLI to install a model. For example:

     ```bash
     ollama pull <model-name>
     ```

     Replace `<model-name>` with the name of the model you want to install.
    For example, to install the `llama2` model, run:

    ```bash
    ollama pull llama2
    ```
    

2. Verify the installation:

     ```bash
     ollama list
     ```

     This will display all installed models.

##  Open ChaBot


### For Linux:
- Open a terminal at the directory where the `runthis.sh` file is located and run:

    ```bash
    chmod +x runthis.sh
    ./runthis.sh
    ```

### For Windows:
- Open Command Prompt at the directory where the `runthis.bat` file is located and run:

    ```command
    runthis
    ```