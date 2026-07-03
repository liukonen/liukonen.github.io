import { PurgeCSS } from 'purgecss';

async function runReadOnlyPurge() {
  try {
    console.log("Analyzing SASS compilation output against codebase...");

    const purgeCSSResult = await new PurgeCSS().purge({
      // 1. Files to scan for class names
      content: [
        './src/**/*.tsx',
        './src/*.tsx', 
        './src/**/*.ts', 
        './index.html',
        './public/case-studies/*.json',
        './public/open-source/*.json',
        './public/showcase/*.json'        
      ],
      // 2. Your compiled CSS file
      css: [
        './src/styles/main.css',
      ],
      // 3. Reject instead of stripping (Readonly Mode)
      rejected: true, 
      
      // FIX: Aggressive multi-line string text extractor
      defaultExtractor: (content) => {
        // This catches text elements matching your standard SASS class configurations
        return content.match(/[\w-/:]+(?<!:)/g) || [];
      }
    });

    console.log("\n--- PURGECSS DRY RUN RESULTS ---");
    
    const rejectedClasses = purgeCSSResult[0]?.rejected || [];

    if (rejectedClasses.length === 0) {
      console.log("✨ Perfect match! No classes would be stripped.");
    } else {
      console.log(`⚠️  The following ${rejectedClasses.length} classes are NOT used in your static files.`);
      console.log("If your injected pages need them, add them to your safelist:\n");
      console.dir(rejectedClasses, { maxArrayLength: null });
    }

  } catch (error) {
    console.error("PurgeCSS Audit Failed:", error);
  }
}

await runReadOnlyPurge();