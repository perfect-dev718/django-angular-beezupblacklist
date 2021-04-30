import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from "@env/environment";

const FILE_NAME_REG = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

@Injectable({providedIn: "root"})
export class ServerApiService {
  baseUrl = environment.url;

  constructor(private http: HttpClient) {
  }

  _removeLeadingSlash(path) {
    return path.replace(/^\//, '');
  }

  _removeTrailingSlash(path) {
    return path.replace(/\/$/, '');
  }


  _getUrl(path): string {
    return this._removeTrailingSlash(this.baseUrl) + '/' + this._removeLeadingSlash(path);
  }

  //todo should be changed on ANGULAR http params (do not use params like a string(concatenation))
  get(url, options?) {
    options = options || {};
    options.params = options.params || {};
    const isPulling = options['pulling'];
    const isIgnoreBar = options['ignoreLoadingBar'];

    if (isIgnoreBar) {
      options.params.ignoreLoadingBar = 'true';
    }

    if (isPulling) {
      options.params.pulling = 'true';
    }
    return this.http.get(this._getUrl(url), options)
      .pipe(map(resp => {
        return this.extractData(resp);
      }));
  }


  post(url, data?, config = {}) {
    return this.http.post(this._getUrl(url), data, config)
      .pipe(map(resp => {
        return this.extractData(resp);
      }));
  }

  put(url, data, params = {}) {
    return this.http.put(this._getUrl(url), data, params)
      .pipe(map(resp => {
        return this.extractData(resp);
      }));
  }

  delete(url, config = {}) {
    return this.http.delete(this._getUrl(url))
      .pipe(map(resp => {
        return this.extractData(resp);
      }));
  }

  private extractData(res) {
    return res.result || res || {};
  }


  _downloadZipFile(data, filename) {
    const urlCreator = window.URL; // || window.webkitURL || window.mozURL || window.msURL;

    if (urlCreator) {
      const link = document.createElement('a');
      const url = urlCreator.createObjectURL(data);

      if ('download' in link) {
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.setAttribute('id', 'tmpDownloadLink');
        document.body.appendChild(link);
        link.click();
        document.getElementById(link.id).remove();
      } else {
        window.open(url);
      }
    }
  }

  _doDownload(data, filename) {
    this._downloadZipFile(data, filename);
  }


}
