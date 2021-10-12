
const pynwbInstallCode = `conda create --name nwb python=3
conda activate nwb
pip install pynwb==2`;

const jupyterInstallCode = `pip install jupyter matplotlib
jupyter notebook`;

const nwbApi1 = `import numpy as np
from pynwb import NWBHDF5IO
import matplotlib.pyplot as plt`;

const nwbApi2 = `from hdmf.common.hierarchicaltable import to_hierarchical_dataframe, flatten_column_index

def getNWBTimestamps(PatchClampSeries, absolute_time = False):
    '''Generate timestamps for any PatchClampSeries object.
    '''
    data_shape = PatchClampSeries.data.shape
    rate = PatchClampSeries.rate
    starting_time = PatchClampSeries.starting_time

    assert len(data_shape) == 1, 'Too many dimensions'
    if absolute_time == False:
        starting_time = 0.0
    nsamples = data_shape[0]
    timestamps = starting_time + np.linspace(0, nsamples/rate, nsamples)
    return timestamps`;

const nwbApi3 = `filepath = '../../example_data/001_140709EXP_A1.nwb'`;

const nwbApi4 = `io = NWBHDF5IO(filepath, 'r', load_namespaces = True)
nwbfile = io.read()`;

const nwbApi5 = `# Consider using nwbfile.get_icephys_meta_parent_table() or nwbfile.icephys_experimental_conditions
# instead of nwbfile.icephys_repetitions
df = to_hierarchical_dataframe(nwbfile.icephys_repetitions).reset_index()
df = flatten_column_index(df, max_levels = 2)`;

const nwbApi6 = `stimulus_types = sorted(df[('sequential_recordings','stimulus_type')].unique().tolist())`;

const nwbApi7_1 = `print(stimulus_types)`;
const nwbApi7_2 = `['APWaveform', 'DeHyperPol', 'Delta', 'ElecCal', 'FirePattern', 'HyperDePol', 'IDRest', 'IDThres', 'IV', 'NegCheops', 'PosCheops', 'RPip', 'RSealClose', 'RSealOpen', 'Rac', 'ResetITC', 'SetAmpl', 'SetISI', 'SineSpec', 'SponHold3', 'SponHold30', 'SponNoHold30', 'StartHold', 'StartNoHold', 'TestAmpl', 'TestRheo', 'sAHP']`;

const nwbApi8 = `# Get stimulus and response traces
trace_no = 60
S = df[('stimuli','stimulus')][trace_no][2] # "2" refers to an implementation detail
R = df[('responses','response')][trace_no][2]`;

const nwbApi9 = `# Plot stimulus
plt.plot(getNWBTimestamps(S), S.data[:] * S.conversion,'r')
plt.xlabel('seconds')
_ = plt.ylabel(S.unit)`;

const nwbApi10 = `# Plot response
plt.plot(getNWBTimestamps(S), R.data[:] * R.conversion,'k')
plt.xlabel('seconds')
_ = plt.ylabel(R.unit)`;

const nwbApi11 = `st = stimulus_types[0]`;

const nwbApi12_1 = `df_st = df[df[('sequential_recordings','stimulus_type')] == st]
repetitions = df_st[('repetitions','id')].unique().tolist()

print(f'Stimulus {st}, repetitions {repetitions}')`;

const nwbApi12_2 = `Stimulus APWaveform, repetitions [1, 2]`;

const nwbApi13 = `fig, axs = plt.subplots(2, len(repetitions), figsize = (12,8), sharex = 'col', sharey = 'row', squeeze = False)

for idx, rep in enumerate(repetitions):

    df_st_rep = df[(df[('sequential_recordings','stimulus_type')] == st) & 
                   (df[('repetitions','id')] == rep)]
    stimuli = df_st_rep[('stimuli','stimulus')]
    responses = df_st_rep[('responses','response')]

    # S and R below are tuples: (start_index, index_count, PatchClampSeries)
    for S in stimuli:
        axs[0, idx].plot(getNWBTimestamps(S[2]), S[2].data[:] * S[2].conversion,'r')
        axs[0, idx].set_ylabel(S[2].unit)
        axs[0, idx].set_title(f'stimuli in repetition {idx+1}')

    for R in responses:
        axs[1, idx].plot(getNWBTimestamps(R[2]), R[2].data[:] * R[2].conversion,'k')
        axs[1, idx].set_ylabel(R[2].unit)
        axs[1, idx].set_title(f'responses in repetition {idx+1}')
        axs[1, idx].set_xlabel('seconds')`;

const matlabInstall1 = `git clone https://github.com/NeurodataWithoutBorders/matnwb.git`;

const matlabInstall2 = `cd matnwb
git checkout 276e462`;

const matlabInstall3 = `cd matnwb
addpath(genpath(pwd));
generateCore()`;

const matlab1 = `filename = '../example_data/001_140709EXP_A1.nwb';

% Read file.
nwb = nwbRead(filename);`;

const matlab2 = `T = getDenormalizedTable(nwb);`;

const matlab3 = `% Get stimulus types
stimulus_types = sort(unique(T.sequential_recordings__stimulus_type));

% Print them
stimulus_types'`;

const matlab4 = `ans =

1×27 cell array

Columns 1 through 4

  {'APWaveform'}    {'DeHyperPol'}    {'Delta'}    {'ElecCal'}

Columns 5 through 9

  {'FirePattern'}    {'HyperDePol'}    {'IDRest'}    {'IDThres'}    {'IV'}

Columns 10 through 13

  {'NegCheops'}    {'PosCheops'}    {'RPip'}    {'RSealClose'}

Columns 14 through 18

  {'RSealOpen'}    {'Rac'}    {'ResetITC'}    {'SetAmpl'}    {'SetISI'}

Columns 19 through 22

  {'SineSpec'}    {'SponHold3'}    {'SponHold30'}    {'SponNoHold30'}

Columns 23 through 26

  {'StartHold'}    {'StartNoHold'}    {'TestAmpl'}    {'TestRheo'}

Column 27

  {'sAHP'}`;

const matlab5 = `st = stimulus_types{2};     % chosen stimulus type
rep = 1;                    % chosen repetition number
filteredT = T(T.sequential_recordings__stimulus_type==string(st) & ...
    T.repetitions__id == rep,:);`;

const matlab6 = `[data, r_time] = cellfun(@(x) getPatchClampSeriesData(nwb, x.path), ...
filteredT.intracellular_recordings__responses__response, ...
'UniformOutput', false);
responses_raw = cell2mat(data');

[data, s_time] = cellfun(@(x) getPatchClampSeriesData(nwb, x.path), ...
filteredT.intracellular_recordings__stimuli__stimulus, ...
'UniformOutput', false);
stimuli_raw = cell2mat(data');`;

const matlab7 = `subplot(2,1,1)
plot(r_time{1}, responses_raw,'k')
title('Response')

subplot(2,1,2)
plot(s_time{1}, stimuli_raw,'r')
title(['Stimulus: ' st])
xlabel('Seconds')`;

const matlab8 = `function T = getDenormalizedTable(nwb)

sep = '__';

% Shortcuts for tables
intracellular_recordings    = nwb.general_intracellular_ephys_intracellular_recordings;
simultaneous_recordings     = nwb.general_intracellular_ephys_simultaneous_recordings;
sequential_recordings       = nwb.general_intracellular_ephys_sequential_recordings;
repetitions                 = nwb.general_intracellular_ephys_repetitions;
experimental_conditions     = nwb.general_intracellular_ephys_experimental_conditions;

% Experimental conditions table
Tec = getTable(experimental_conditions,'experimental_conditions',1);

% Repetitions table
indices = expandRagged(experimental_conditions.repetitions_index.data.load);
Tr = [Tec(indices,:) getTable(repetitions,'repetitions',1)];

% Sequential recordings table
indices = expandRagged(repetitions.sequential_recordings_index.data.load);
Tsqr = [Tr(indices,:) getTable(sequential_recordings,'sequential_recordings',1)];

% Simultaneous recordings
indices = expandRagged(sequential_recordings.simultaneous_recordings_index.data.load);
Tsir = [Tsqr(indices,:) getTable(simultaneous_recordings,'simultaneous_recordings',1)];

% Intracellular recordings table
prefix = 'intracellular_recordings';
indices = expandRagged(simultaneous_recordings.recordings_index.data.load);
Tir = [Tsir(indices,:) getTable(intracellular_recordings,prefix,1)];

stimuli = intracellular_recordings.stimuli.stimulus.data.load;
stimuli = rowfun(@tableToStruct, stimuli, 'OutputFormat', 'cell');

responses = intracellular_recordings.responses.response.data.load;
responses = rowfun(@tableToStruct, responses, 'OutputFormat', 'cell');

Tstimuli_responses = [...
    table(stimuli,'VariableNames', {[prefix sep 'stimuli' sep 'stimulus']}), ...
    getTable(intracellular_recordings.stimuli,[prefix sep 'stimuli'], 1), ...
    table(responses,'VariableNames',{[prefix sep 'responses' sep 'response']}), ...
    getTable(intracellular_recordings.responses,[prefix sep 'responses'], 1) ...
    ];

T = [Tir Tstimuli_responses];

end


function dest_indices = expandRagged(index)
% This function expands the indices of a ragged array
% Example: [3 4 6]' will become [1 1 1 2 3 3]'
% See https://github.com/NeurodataWithoutBorders/matnwb/blob/master/%2Butil/read_indexed_column.m
dest_indices = [];
source_indices = 1:length(index);

for i=1:length(index)
    if i==1
        dest_indices(1:index(1),1) = source_indices(i);
    else
        dest_indices(index(i-1)+1:index(i),1) = source_indices(i);
    end

end
end


function out = tableToStruct(A,B,C)
out.idx_start = A;
out.count = B;
out.path = C.path;
end


function T = getTable(nwbtable, prefix, getIDColumn)

sep = '__';

exclude_tables = ["types.core.IntracellularStimuliTable", ...
    "types.core.IntracellularResponsesTable", ...
    "types.core.IntracellularRecordingsTable"];

T = table();
colnames = nwbtable.colnames;
if iscell(colnames)
    for cidx = 1:length(colnames)
        colname = colnames{cidx};
        isPresetColumn = false;

        try
            % if Vector belongs to nwbtable
            col = nwbtable.(colname);

            if ismember(class(nwbtable),exclude_tables) && ...
                    ismember(colname,["stimulus", "response"])
                continue
            end

            % Skip columns referencing lower-level tables
            if class(nwbtable.(colname)) == ...
                    "types.hdmf_common.DynamicTableRegion"
                continue
            end

            col = col.data.load;
            isPresetColumn = true;
        catch
            % proceed: it doesn't, so it is in vectordata
            col = nwbtable.vectordata.get(colname).data.load;
        end

        try
            % check if this Vector is indexed
            vindex = nwbtable.vectordata.get([colname '_index']);
            vindex_data = vindex.data.load;
            col = readIndexedVector(nwbtable.id.data.load, col, vindex_data);
        catch
            % do nothing
        end

        if ~isPresetColumn
            if nwbtable.vectordata.get(colname).data.dims == 1
                col = {col};
            end
        end

        newcolname = [prefix sep colname];
        newcolname = matlab.lang.makeValidName(newcolname, 'ReplacementStyle','hex');
        N = table(col,'VariableNames',{newcolname});
        szN = size(N);
        szT = size(T);
        if isempty(T) || szN(1)==szT(1)
            T = [T N];
        else
            if szN(1)~=szT(1)
                % TODO. This has to be fixed
                fprintf('Column %s skipped.\\n', newcolname)
            end
        end
    end
end

if getIDColumn
    colname = [prefix sep 'id'];
    table_id = table(nwbtable.id.data.load, 'VariableNames', {colname});
    T = [table_id T];
end
end


function out = readIndexedVector(dims, data, index)
out = cell(dims,1);
for i=1:dims
    out{i} = data(1:index(i));
end
end


function [data, timestamps] = getPatchClampSeriesData(nwb,path)

% Split filename
components = strsplit(path,'/');
name = components(end);

% Get PatchClampSeries object
if strfind(path,'/stimulus/templates/') == 1
    PatchClampSeries = nwb.stimulus_templates.get(name);
elseif strfind(path,'/stimulus/presentation/') == 1
    PatchClampSeries = nwb.stimulus_presentation.get(name);
elseif strfind(path,'/acquisition/') == 1
    PatchClampSeries = nwb.acquisition.get(name);
end

% Read data
data_raw = PatchClampSeries.data.load;
conversion = PatchClampSeries.data_conversion;
data = data_raw * conversion;

% Calculate timestamps
starting_time_rate = PatchClampSeries.starting_time_rate;
timestamps = linspace(0.0,1/starting_time_rate*length(data),length(data))';
end`;

const matlab9 = `Column intracellular_recordings__stimuli__step_amplitude skipped.
Column intracellular_recordings__stimuli__step_onset skipped.
Column intracellular_recordings__stimuli__step_duration skipped.
Column intracellular_recordings__responses__step_amplitude skipped.
Column intracellular_recordings__responses__step_onset skipped.
Column intracellular_recordings__responses__step_duration skipped.`;


const nwbCode = {
  pynwbInstallCode,
  jupyterInstallCode,

  nwbApi1,
  nwbApi2,
  nwbApi3,
  nwbApi4,
  nwbApi5,
  nwbApi6,
  nwbApi7_1,
  nwbApi7_2,
  nwbApi8,
  nwbApi9,
  nwbApi10,
  nwbApi11,
  nwbApi12_1,
  nwbApi12_2,
  nwbApi13,

  matlabInstall1,
  matlabInstall2,
  matlabInstall3,

  matlab1,
  matlab2,
  matlab3,
  matlab4,
  matlab5,
  matlab6,
  matlab7,
  matlab8,
  matlab9,
};

export default nwbCode;
