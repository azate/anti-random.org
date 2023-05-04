# [🤫](https://stats.azate.org/share/744cmBjq/anti-random) [[RU](README_RU.md)] Anti-random for [random.org](https://random.org) - Chrome Extension

<p align="center">
  <img src="demo.gif" alt="Demo"/>
</p>

## Overview
This extension allows you to falsify results for the random number block on the home page and the list randomizer.

The expansion was created to demonstrate the possibility of skilful manipulation of results for draws, as well as to encourage participants and organizers to pay attention to the use of well-known services, which provide the ability to view the final results to anyone via a link.

## Installing from releases

- Download the **anti-random.org-\*.zip** file in the latest available [release](https://github.com/azate/anti-random.org/releases)
- Unzip the archive
- Open your browser and go to the extensions page using this URL ```chrome://extensions```
- Make sure that **Developer mode** is enabled
- Click the **Load unpacked extension** button and select the directory with the unpacked extension

## Using

- Go to extension options
- Add your values for the type of randomizer you want to falsify

### For the random number block

- Go to the [page](https://random.org)
- In the **True Random Number Generator** block, fill in the desired minimum and maximum value
- Click the **Generate** button with the right mouse button
- If there are values you specify for falsification and one of them falls into the range you specify, you will see a falsified result
- After tampering, the value will be deleted to prevent reuse
- In all other cases, a real random will be used

### For the list randomizer

- Go to the [page](https://www.random.org/lists)
- Fill in the field
- Click **Randomize** or **Again!** right mouse button
- If there are values you set for falsification, you will see the falsified result with the replacement of the first elements in the list
- After tampering, the value will be deleted to prevent reuse
- In all other cases, a real random will be used

## FAQ

#### I added the desired results for tampering, but they are not substituted

- Check that the extension is enabled
- Make sure that you right-click on the corresponding button
- Perhaps there have been some changes on the site, and the extension needs updating

#### You can implement additional functionality?

In short, no. The extension was created for demonstration purposes, but if you implement it yourself and create a pull request, I will consider it

#### How to support you?

- In the form of money, it will help me spend more time implementing various ideas and share the results with you
  - BTC ```bc1q58yh0xqpg05s8qxv6yj63aq8n9l4t7n0p542vv```
- To disseminate information about this project in the information space with noble goals

#### Is it safe?

The author does not take any responsibility, according to the license. The code is open source, and you can audit it or build it yourself from source without using the analytics that are present in ready-made releases. Analytics are only built into the extension options and are used to find out audience coverage

## Local build and installation

### Requirements

- Linux
- make ~4.3
- node ~14
- yarn ~1.22

### Build

- Download the **Source code (zip)** file in the latest available [release](https://github.com/azate/anti-random.org/releases)
- Unzip the archive and go to the folder with the extension
- Use the terminal to run the command ```make build```
- An archive will appear in the **artifacts** folder

### Installation

- Unzip the archive from the **artifacts** folder
- Open your browser and go to the extensions page using this URL ```chrome://extensions```
- Make sure that **Developer mode** is enabled
- Click the **Load unpacked extension** button and select the directory with the unpacked extension from the **artifacts** folder
