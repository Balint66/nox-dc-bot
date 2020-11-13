'use strict';
import { Client } from 'discord.js';
const { loadEvents, loadCommands } = require('./loaders.js');
require('dotenv').config();

const client = new Client();

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);