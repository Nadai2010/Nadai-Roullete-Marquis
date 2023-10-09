## Integrate React with Dojo: A Quick Start Guide

Dive into this straightforward example to understand how to meld React with Dojo.

This integration taps into the powerful libraries designed by [Lattice](https://lattice.xyz/):

- [recs](https://github.com/latticexyz/mud/tree/main/packages/recs)

### Initial Setup

The repository already contains the `dojo-starter` as a submodule. Feel free to remove it if you prefer.

**Prerequisites:** First and foremost, ensure that Dojo is installed on your system. If it isn't, you can easily get it set up with:

```console
curl -L https://install.dojoengine.org | bash
```

Followed by:

```console
dojoup    
```

For an in-depth setup guide, consult the [Dojo book](https://book.dojoengine.org/getting-started/quick-start.html).

### Launch the Example in Under 30 Seconds

After cloning the project, execute the following:

1. **Terminal 1 - Katana**:

```console
cd Nadai-Roullete-Marquis/dojo-starter && make katana
```

2. **Terminal 2 - Contracts**:

```console
cd dojo-starter && make sozo
```

3. **Terminal 3 - Client**:

```console
cd front-end && yarn && yarn dev
```

or if using bun

```console
cd front-end && bun install && bun dev
```

4. **Terminal 2 - Torii**:

```console
torii
```

Upon completion, launch your browser and navigate to http://localhost:5173/. You'll be greeted by the running example!