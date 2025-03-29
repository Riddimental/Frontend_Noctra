// Fetch a random image based on category and dimensions
export async function fetchRandomImage(category, width = 640, height = 480) {
   try {
   const response = await fetch(`https://api.api-ninjas.com/v1/randomimage?category=${category}&width=${width}&height=${height}`, {
      headers: { 
         'X-Api-Key': 'XRF0rZwmRCIe5ojgqeuZpA==J31cDd2kZpNNzpqD',
         'Accept': 'image/jpg'
      }
   });

   const blob = await response.blob();
   const imgURL = URL.createObjectURL(blob);
   return imgURL;
   } catch (error) {
   console.error('Error:', error);
   return null;  // Return null if there's an error
   }
}


// Create functions that return promises when called
export const getProfilePic = () => fetchRandomImage('nature', 200, 200);
export const getPostPic = () => fetchRandomImage('', 500, (Math.random() * 500) + 500); // random height between 500 and 1000
export const getCoverPic = () => fetchRandomImage('city', 500, 300);
