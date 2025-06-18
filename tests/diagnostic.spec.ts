// diagnostic.spec.ts (pour isoler le problème)
import { test, expect } from '@playwright/test'

test('should load homepage', async ({ page }) => {
  console.log('🚀 Starting homepage test...')
  
  try {
    await page.goto('http://localhost:3000', { timeout: 30000 })
    console.log('✅ Homepage loaded')
    
    const title = await page.title()
    console.log(`📄 Page title: ${title}`)
    
    expect(title).toBeTruthy()
  } catch (error) {
    console.error('❌ Homepage test failed:', error)
    throw error
  }
})

test('should load tools page', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/tools', { timeout: 30000 })
    console.log('✅ Tools page loaded')
    
    const heading = await page.locator('h1').first().textContent()
    console.log(`📄 Page heading: ${heading}`)
    
  } catch (error) {
    console.error('❌ Tools test failed:', error)
    throw error
  }
})