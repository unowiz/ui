import * as React from 'react'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { connect } from 'react-redux'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import * as isEqual from 'lodash.isequal'
import { toastr } from 'react-redux-toastr'
import { NotebookStore } from './../../store/NotebookStore'
import { ParagraphStatus, isParagraphRunning } from './../paragraph/ParagraphUtil'
import FabricIcon from '../../components/FabricIcon'
import history from './../../history/History'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { mapStateToPropsNotebook, mapDispatchToPropsNotebook } from './../../actions/NotebookActions'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from '../../actions/AuthActions'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import GoogleProfileWidget from './../profile/GoogleProfileWidget'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import AWSCapacity from './../aws/AWSCapacity'
import K8SClusterTopology from './../cluster/K8SClusterTopology'
import K8SClusterStatus from './../cluster/K8SClusterStatus'
import ReservationsStatus from './../reservations/ReservationsStatus'
import HDFStatus from './../hdfs/HDFSStatus'
import SparkStatus from './../spark/SparkStatus'
import RunningStatus from './../run/RunningStatus'
import SpitfireInterpretersStatus from './../spitfire/SpitfireInterpretersStatus'
import { Colors } from './../../util/Utils'
import NetworkStatus from './../network/NetworkStatus'
import NotebookApi from './../../api/notebook/NotebookApi'
import SpitfireApi from './../../api/spitfire/SpitfireApi'
import KuberApi from './../../api/kuber/KuberApi'
import { stripString } from './../../util/Utils'
import * as stylesImport from './../_styles/Styles.scss'
const styles: any = stylesImport

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsNotebook, mapDispatchToPropsNotebook)
export default class ControlHeader extends React.Component<any, any> {
  private interval: NodeJS.Timer
  private notebookApi: NotebookApi
  private spitfireApi: SpitfireApi
  private kuberApi: KuberApi

  private k8sClusterStatus: K8SClusterStatus
  private awsCapacity: AWSCapacity
  private reservationsStatus: ReservationsStatus
  private k8sClusterTopology: K8SClusterTopology
  private hdfsStatus: HDFStatus
  private sparkStatus: SparkStatus
  private runningStatus: RunningStatus
  private networkStatus: NetworkStatus

  state = {
    config: emptyConfig,
    profilePhoto: window.URL.createObjectURL(NotebookStore.state().profilePhotoBlob),
    statusPanel: '',
    clusterColor: Colors.GREEN,
    reservationsColor: Colors.GREEN,
    topologyColor: Colors.GREEN,
    hdfsColor: Colors.GREEN,
    sparkColor: Colors.GREEN,
    runningColor: Colors.GREEN,
    networkColor: Colors.GREEN
  }

  public constructor(props) {
    super(props)
    this.notebookApi = window['NotebookApi']
    this.spitfireApi = window['SpitfireApi']
    this.kuberApi = window['KuberApi']
  }

  public render() {
    const { statusPanel, profilePhoto, clusterColor, reservationsColor,
       topologyColor, hdfsColor, sparkColor, runningColor, networkColor } = this.state
    return (
      <div>
        <div style={{ float: 'right', padding: '0px 10px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); this.setState({statusPanel: 'profile'}) }}>
            <Persona
              imageUrl = { profilePhoto }
              hidePersonaDetails = { true }
              presence = { PersonaPresence.online }
              size = { PersonaSize.extraSmall }
              className = "text-center"
            />
          </a>
        </div>
        <div style={{ float: 'right' }}>
          <a href="#"
              onClick={(e) => {e.preventDefault(); this.setState({
              statusPanel: 'cluster'
            })}}>
            <Icon iconName="Health" 
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${clusterColor}`}
              title="Cluster"
              />
          </a>
          <a href="#"
              onClick={(e) => {e.preventDefault(); this.setState({
                statusPanel: 'reservations'
              })}}>
            <Icon iconName="Clock"
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${reservationsColor}`}
              title="Reservations"
            />
          </a>
          <a href="#"
            onClick={(e) => {e.preventDefault(); this.setState({
              statusPanel: 'topology'
            })}}>
            <Icon iconName="TFVCLogo" 
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${topologyColor}`}
              title="Topology"
              />
          </a>
          <a href="#"
            onClick={(e) => {e.preventDefault(); this.setState({
              statusPanel: 'hdfs'
            })}}
          >
            <Icon iconName="OfflineStorageSolid" 
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${hdfsColor}`}
              title="HDFS"
              />
          </a>
          <a href="#"
            onClick={(e) => {e.preventDefault(); this.setState({
              statusPanel: 'spark'
            })}}>
            <Icon iconName="LightningBolt" 
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${sparkColor}`}
              title="Spark"
              />
          </a>
          <a href="#"
            onClick={(e) => {e.preventDefault(); this.setState({
              statusPanel: 'running'
            })}}>
            <Icon iconName="Running" 
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${runningColor}`}
              title="Running"
              />
          </a>
          <a href="#"
            onClick={(e) => {e.preventDefault(); this.setState({
              statusPanel: 'network'
            })}}>
            <Icon iconName="NetworkTower"
              className={`${styles.dlaIndicatorIcon} ms-fontColor-${networkColor}`}
              title="Network"
              />
          </a>
        </div>
        <Panel
          isBlocking={ true }
          isOpen={ statusPanel != '' }
          type={ PanelType.medium }
          onDismiss={() => this.setState({statusPanel: ''})}
        >
        <div>
          {(statusPanel == 'profile') &&
          <div>
            <div className="ms-font-su"><FabricIcon name="Accounts" /> Profile</div>
            <GoogleProfileWidget/>
          </div>
          }
          {
            (statusPanel == 'cluster') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="Health" /> Cluster</div>
              <hr/>
              <AWSCapacity ref={ ref => this.awsCapacity = ref } />
              <hr/>
              <K8SClusterStatus ref={ ref => this.k8sClusterStatus = ref } />
            </div>
          }
          {
            (statusPanel == 'reservations') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="Clock" /> Reservations</div>
              <ReservationsStatus ref={ ref => this.reservationsStatus = ref } />
            </div>
          }
          {
            (statusPanel == 'topology') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="TFVCLogo" /> Topology</div>
              <K8SClusterTopology ref={ ref => this.k8sClusterTopology = ref } />
            </div>
          }
          {
            (statusPanel == 'hdfs') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="OfflineStorageSolid" /> HDFS</div>
              <HDFStatus ref={ ref => this.hdfsStatus = ref } />
            </div>
          }
          {
            (statusPanel == 'spark') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="LightningBolt" /> Spark</div>
              <SparkStatus ref={ ref => this.sparkStatus = ref } />
            </div>
          }
          {
            (statusPanel == 'running') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="Running" /> Running</div>
              <RunningStatus ref={ ref => this.runningStatus = ref } />
            </div>
          }
          {
            (statusPanel == 'network') &&
            <div>
              <div className="ms-font-su"><FabricIcon name="NetworkTower" /> Network</div>
              <NetworkStatus 
                kuberHealthy={this.kuberApi.state.webSocketHealthy}
                spitfireHealthy={this.spitfireApi.state.webSocketHealthy}
                ref={ ref => this.networkStatus = ref } 
                />
            </div>
          }
          </div>
        </Panel>
      </div>
    )
  }

  public componentDidMount() {
    this.interval = setInterval( _ => {
      this.tick()
    }, 1000)
  }

  public componentWillReceiveProps(nextProps) {
    const { config, runningParagraphs, spitfireMessageReceived } = nextProps
    if (config && ! isEqual(config, this.state.config)) {
      this.setState({
        config: config
      })
    }
    if (runningParagraphs) {
      this.setState({
        runningParagraphs: runningParagraphs
      })
    }
    if (spitfireMessageReceived && (spitfireMessageReceived.op == "PARAGRAPH")) {
      var p = spitfireMessageReceived.data.paragraph
      if (p.status == ParagraphStatus.ERROR) {
        var errorMessage = p.errorMessage
        if (p.results && p.results.msg && p.results.msg.length > 0) {
          errorMessage = p.results.msg[0].data
        }
        toastr.warning('Run Error', stripString(errorMessage, 100))
/*
        this.setState({
          statusPanel: 'running'
        })
*/
      }
  }
  }

  private tick() {
    this.updateK8SClusterStatus()
    this.updateRunning()
    this.updateNetwork()
  }

  private updateK8SClusterStatus() {
    var kuberStatus = NotebookStore.state().kuberStatus
    if (!kuberStatus.cluster) {
      this.setState({
        clusterColor: Colors.RED
      })
      return
    }
    if (!kuberStatus.clusterStatus.awsWorkerAutoscalingGroup.Instances) {
      this.setState({
        clusterColor: Colors.RED
      })
      return
    }
    if (kuberStatus.clusterStatus.awsWorkerAutoscalingGroup.DesiredCapacity != kuberStatus.clusterStatus.awsWorkerAutoscalingGroup.Instances.length) {
      this.setState({
        clusterColor: Colors.RED
      })
      return
    }
    this.setState({
      clusterColor: Colors.GREEN
    })
  }
  
  private updateRunning() {
    var paragraphs = NotebookStore.state().runningParagraphs
    if (this.runningStatus) {
      this.runningStatus.setState({
        runningParagraphs: paragraphs
      })
    }
    if (paragraphs.size == 0) {
      this.setState({
        runningColor: Colors.GREEN
      })
    } 
    else {
      var col = this.state.runningColor
      var hasError = false
      Array.from(paragraphs).map(p => {
        if (p[1] && (p[1].status == ParagraphStatus.ERROR)) {
          hasError = true
        }
      })
      if (hasError) {
        this.setState({
          runningColor: (col == Colors.WHITE) ? Colors.RED : Colors.WHITE
        })
      }
      else {
        this.setState({
          runningColor: (col == Colors.WHITE) ? Colors.BLUE : Colors.WHITE
        })
      }
    }
  }

  private updateNetwork() {
    if (this.networkStatus) {
      this.networkStatus.setState({
        kuberHealthy: this.kuberApi.state.webSocketHealthy,
        spitfireHealthy: this.spitfireApi.state.webSocketHealthy,
        timestamp: new Date().toString
      })
    }
    if (this.spitfireApi.state.webSocketHealthy && this.kuberApi.state.webSocketHealthy) {
      this.setState({
        networkColor: Colors.GREEN
      })
    } else {
      this.setState({
        networkColor: Colors.RED
      })
    }
  }

}
