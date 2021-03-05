handleNavigation()
document.querySelector('.content').addEventListener('scroll', handleNavigation)

function isInViewport(element) {
  const rect = element.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function handleNavigation () {
  let active
  const contents = document.querySelectorAll('.content h2, .content h3, .content h4, .content h5, .content h6')

  for (const content of contents) {
    if (isInViewport(content)) {
      active = content
      break
    }
  }

  history.replaceState(null, null, location.pathname + '#' + active.getAttribute('id'))

  const navigationItems = document.querySelectorAll('.navigation a')

  for (const navigationItem of navigationItems) {
    navigationItem.classList.remove('active')

    if (navigationItem.getAttribute('href') === `#${active.getAttribute('id')}`) {
      navigationItem.classList.add('active')
    }
  }
}
