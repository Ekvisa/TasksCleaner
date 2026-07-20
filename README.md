# Tasks Cleaner

_Made with ❤️ for the wonderful teacher and my beloved friend._

Live: https://ekvisa.github.io/TasksCleaner/

A small client-side web application for cleaning up HTML exercises copied from a browser and preparing them for insertion into Microsoft Word.

## Why?

This project started from a real problem.

A close friend of mine is a Russian language teacher. She often prepared worksheets by copying exercises from an educational platform into Word. Each page contained lots of extra HTML: service information, metadata, support blocks, advertisements, empty paragraphs, and other elements that had to be removed manually.

We decided that computers should probably do that part instead.

So this little tool was born.

## What it does

The application:

- reads text/html from the clipboard using the Clipboard API;
- parses the HTML with DOMParser;
- extracts exercise blocks;
- removes unnecessary metadata and service elements;
- removes empty paragraphs and notes;
- preserves useful formatting (`<strong>`, `<em>`, paragraphs, lists, etc.);
- copies the cleaned HTML back to the clipboard so it can be pasted directly into Microsoft Word.

Everything happens locally in your browser.



## Workflow


Educational platform page (ex.: https://3.shkolkovo.online/catalog/11553?Page=2)  
&nbsp; ↓ _Copy_  
Clipboard (HTML)  
&nbsp; ↓  
HTML Exercise Cleaner  
&nbsp; ↓  
Clean HTML  
&nbsp; ↓ _Copy_  
Microsoft Word
 
## Technologies

- React
- TypeScript
- Vite
- Clipboard API
- DOMParser
- DOM manipulation

 
### _Note:_
The current version is designed for the HTML structure of one particular educational platform.
It is not a web scraper and does not download pages automatically.
The application only processes HTML that the user has already copied into the clipboard.

## Future ideas
- Download as .docx
- Configurable cleaning rules
- Support multiple HTML layouts
- Optional grouping of exercises with identical instructions
