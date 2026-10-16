import { createClient } from '@supabase/supabase-js'

// ⚠️ এখানে আপনার আসল URL বসান
const SUPABASE_URL = 'https://ntkemqoecnvjdhpbhmbd.supabase.co'

// ⚠️ এখানে আপনার আসল Publishable Key বসান
const SUPABASE_KEY = 'sb_publishable_t9CppUA-0migs060T783yg_yTjqb3NU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
