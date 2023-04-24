// lib/tailwind.js
import {create} from 'twrnc';

// create the customized version...
const Tailwind = create(require(`../../../tailwind.config`)); // <- your path may differ

// ... and then this becomes the main function your app uses
export default Tailwind;
