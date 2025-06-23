export function formatTime(isoString: string): { date: string; time: string } {
const date = new Date(isoString);


const day = date.getUTCDate().toString().padStart(2, '0');
const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); 
const year = date.getUTCFullYear();


let hours = date.getUTCHours();
const minutes = date.getUTCMinutes().toString().padStart(2, '0');
const seconds = date.getUTCSeconds().toString().padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;


const formattedDate = `${day}/${month}/${year}`;
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

console.log("date =", formattedDate); 
console.log("time =", formattedTime); 
return {
  date: formattedDate,
  time: formattedTime,
}
}
