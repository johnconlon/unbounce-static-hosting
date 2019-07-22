function tryRenderGreenhouseJobs() {      
  var jobs = greenhouseJobs;
  var html = [];
  var i;
  var job;
  var jobLocationName;
  if (isJobsReady && isDomReady && jobs) {
    html.push('<section class="careers"><div class="container"><div class="row">');
    for (i = 0; i < jobs.length; i++) {
      job = jobs[i];
      if (job) {
        jobLocationName = (job.location && job.location.name) ? job.location.name : ''; 

        html.push('<div class="col">');
        html.push('  <div class="career-card">');
        html.push('    <h3 class="career-card__title">');
        html.push('      <a href="' + job.absolute_url + '" target="_blank">');
        html.push('        ' + job.title);
        html.push('      </a>');
        html.push('    </h3>');
        html.push('    <p class="career-card__loc"><span class="icon-marker"></span> ' + jobLocationName +'</p>');
        html.push('  </div>');
        html.push('</div>');
      }
    }
    html.push('<div class="col">');
    html.push('  <div class="career-card career-card--disabled">');
    html.push('    <p class="career-card__msg">Check back soon for new positions. </p>');
    html.push('  </div>');
    html.push('</div>');
    html.push('</div></div></section>');
    $('#greenhouse-placeholder').closest('.container').after(html.join(''));
  }
}
