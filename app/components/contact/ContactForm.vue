<script setup lang="ts">
import { css } from '~~/styled-system/css'

const INTERESTS = ['Web', 'E‑shop', 'Mobilná appka', 'Softvér na mieru', 'Ešte neviem presne']
const BUDGETS = ['do 3 000 €', '3 000 až 8 000 €', 'nad 8 000 €', 'Ešte neviem']

const form = reactive({
  name: '',
  email: '',
  interest: '',
  budget: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

/** Netlify Forms AJAX submit — statický HTML formulár Netlify zachytí pri builde. */
async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    const body = new URLSearchParams({
      'form-name': 'kontakt',
      'meno': form.name,
      'email': form.email,
      'zaujem': form.interest,
      'rozpocet': form.budget,
      'sprava': form.message,
    })
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    if (!response.ok) throw new Error(`Netlify Forms: ${response.status}`)
    status.value = 'sent'
  }
  catch {
    status.value = 'error'
  }
}

const fieldGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '40px',
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
})

/** Blueprint štítok poľa — čiarka a verzálky ako sekčné eyebrow. */
const fieldLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'dim',
  _before: { content: '""', width: '18px', height: '2px', background: 'accent' },
})

const input = css({
  width: '100%',
  height: '54px',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: 'ink/24',
  borderRadius: 0,
  fontSize: '17px',
  color: 'ink',
  _placeholder: { color: 'dim' },
  _focus: { outline: 'none', borderColor: 'accent' },
})

const textarea = css({
  width: '100%',
  minHeight: '92px',
  paddingTop: '16px',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: 'ink/24',
  borderRadius: 0,
  fontSize: '17px',
  color: 'ink',
  resize: 'vertical',
  _placeholder: { color: 'dim' },
  _focus: { outline: 'none', borderColor: 'accent' },
})

const section = css({ marginTop: '44px' })

const submitRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '22px',
  marginTop: '46px',
  flexWrap: 'wrap',
})


const errorNote = css({
  fontSize: '14px',
  color: 'accent.deep',
  marginTop: '16px',
})

const errorLink = css({
  fontWeight: 600,
  textDecoration: 'underline',
})

/**
 * Stav po odoslaní — žiadna kartička, veľký stredový moment na mieste
 * formulára: obria fajka z hmoty pleskne na stránku, pod ňou nadpis
 * v mierke sekcií a odkaz na projekty, kým čakáte na odpoveď.
 */
const success = css({
  minHeight: 'clamp(380px, 46vh, 520px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  paddingBlock: 'clamp(36px, 5vh, 64px)',
})

/** Fajka z hmoty — jediné miesto, kde návštevník niečo dokončil. */
const successMark = css({
  transformOrigin: '50% 100%',
  animation: 'claySplat 1s {easings.out} 0.1s backwards',
  _motionReduce: { animation: 'none' },
})

const successTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(34px, 3.6vw, 58px)',
  lineHeight: 1.02,
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
  marginTop: '30px',
})

const successText = css({
  fontSize: 'clamp(15.5px, 1.1vw, 17px)',
  color: 'dim',
  maxWidth: '46ch',
  margin: '16px 0 0',
})

const successCta = css({
  marginTop: '36px',
})

const honeypot = css({ display: 'none' })
</script>

<template>
  <div v-if="status === 'sent'" :class="success">
    <span :class="successMark"><ClayGlyph name="fajka" :size="128" /></span>
    <div :class="successTitle">Správa letí k nám</div>
    <p :class="successText">Ďakujeme! Ozveme sa do 24 hodín na e‑mail, ktorý ste uviedli.</p>
    <div :class="successCta">
      <AppButton href="/projekty" variant="ghost" arrow>Zatiaľ si pozrite našu prácu</AppButton>
    </div>
  </div>

  <form
    v-else
    name="kontakt"
    method="post"
    data-netlify="true"
    netlify-honeypot="bot-field"
    @submit.prevent="submit"
  >
    <input type="hidden" name="form-name" value="kontakt">
    <p :class="honeypot" aria-hidden="true">
      <label>Nevypĺňajte: <input name="bot-field"></label>
    </p>

    <div :class="fieldGrid">
      <div>
        <label :class="fieldLabel" for="kontakt-meno">Meno a priezvisko</label>
        <input id="kontakt-meno" v-model="form.name" :class="input" type="text" name="meno" placeholder="Jana Nováková" autocomplete="name">
      </div>
      <div>
        <label :class="fieldLabel" for="kontakt-email">E‑mail</label>
        <input id="kontakt-email" v-model="form.email" :class="input" type="email" name="email" placeholder="jana@firma.sk" autocomplete="email" required>
      </div>
    </div>

    <div :class="section">
      <ChoiceChips v-model="form.interest" label="O čo máte záujem?" name="zaujem" :options="INTERESTS" />
    </div>
    <div :class="section">
      <ChoiceChips v-model="form.budget" label="Orientačný rozpočet" name="rozpocet" :options="BUDGETS" />
    </div>

    <div :class="section">
      <label :class="fieldLabel" for="kontakt-sprava">Správa</label>
      <textarea
        id="kontakt-sprava"
        v-model="form.message"
        :class="textarea"
        name="sprava"
        placeholder="Ahojte, chystáme rezervačný systém pre naše štúdio a potrebujeme…"
        required
      />
    </div>

    <div :class="submitRow">
      <AppButton type="submit" arrow>
        {{ status === 'sending' ? 'Odosielam…' : 'Odoslať správu' }}
      </AppButton>
    </div>
    <p v-if="status === 'error'" :class="errorNote">
      Správu sa nepodarilo odoslať. Skúste to znova, alebo nám napíšte priamo na
      <a :class="errorLink" href="mailto:napiste@daktus.sk">napiste@daktus.sk</a>.
    </p>
  </form>
</template>
