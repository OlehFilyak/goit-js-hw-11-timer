class CountdownTimer {
    constructor ({selector, targetDate}) {
      this.selector = selector;
      this.targetDate = targetDate;
      this.start()
      this.refs = {
        days: document.querySelector(
          `${this.selector} span[data-value="days"]`
        ),
        hours: document.querySelector(
          `${this.selector} span[data-value="hours"]`
        ),
        minsEl: document.querySelector(
          `${this.selector} span[data-value="mins"]`
        ),
        secsEl: document.querySelector(
          `${this.selector} span[data-value="secs"]`
        ),
      };
    }
  
    calcDeltaTime() {
        let dateNow = Date.now() // a new date, time must be created each time the function is called
        let deltaTime = this.targetDate - dateNow
        // let oneYear = 31536000000;
        if(deltaTime>0) {
          this.calcDays(deltaTime)
        } else {
            deltaTime += 31536000000;
            this.calcDays(deltaTime)
        }
    }
  
    calcDays(deltaTime) {
      const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24))); // по формулах отримали значення днів, годин, хвилин, секунд
      const hours = this.pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = this.pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
      this.updateComponents(days, hours, mins, secs)
    }
  
    updateComponents(days, hours, mins, secs) {  
      this.refs.days.textContent = days; 
      this.refs.hours.textContent = hours;
      this.refs.minsEl.textContent = mins;
      this.refs.secsEl.textContent = secs;
    }
  
  
  pad(value) {// Add one digit if the value is less than 2. If it comes to 1, it turns 01
      return String(value).padStart(2, '0');
  }
  
  start() {
    setInterval(() => {
      this.calcDeltaTime()
    }, 1000)
  }
  }
  
  const timeToMyBithday = new CountdownTimer ({
      selector: '#timer-1',
      targetDate: new Date('Sep 23, 2020'),
  })